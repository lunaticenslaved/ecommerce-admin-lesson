'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useOrigin } from '@/hooks/use-origin';

interface SettingsFormProps {
  initialData: Store;
}

const SettingsSchema = z.object({
  name: z.string().min(2),
});

type Values = z.infer<typeof SettingsSchema>;

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<Values>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: initialData,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: Values) {
    setLoading(true);

    try {
      await axios.patch(`/api/stores/${initialData.id}`, values);
      router.refresh();
      toast.success('Store updated.');
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);

      await axios.delete(`/api/stores/${initialData.id}`);

      router.refresh();
      router.push('/');

      toast.success('Store deleted.');
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Store settings" description="Manage store preferences" />
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${initialData.id}`}
      />
    </>
  );
}
