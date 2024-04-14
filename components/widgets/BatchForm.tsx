"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "./DatePicker";
import { handleGenerateData } from "@/actions/batch.action";
import { useToast } from "@/components/ui/use-toast"

export type PostData = {
  model: string;
  batch_date: Date;
  license_level: number;
  quantity: number;
  comment?: string;
};

const formSchema = z.object({
  model: z.string().min(1, { message: "Model is required" }),
  batch_date: z.date(),
  license_level: z.number().min(0, { message: "License Level is required" }),
  quantity: z.number().min(1, { message: "Quantity must be greater than 0" }),
  comment: z.string().optional(),
});

export default function BatchForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      batch_date: new Date(),
      license_level: undefined,
      quantity: undefined,
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await handleGenerateData(values);
      toast({
        title: "Submitted",
        description: "Batch form submitted successfully!",
        className:"bg-white text-black"
      })
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <main className="flex min-h-screen bg-neutral-900 flex-col p-24">
      <div className="max-w-xl rounded border-solid border-2 border-yellow-800 text-white">
        <div className="px-10 py-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl">
              <div className="font-bold text-xl mb-6">Batch Form</div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          field.value = value;
                          field.name = "model";
                          field.disabled = false;
                        }}
                      >
                        <SelectTrigger className="bg-white rounded text-black">
                          <SelectValue
                            className="text-black placeholder:text-black"
                            placeholder="Model"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900 text-sm focus:border-blue-500 w-full p-2.5  dark:border-gray-600">
                          <SelectItem value="model-1">Model 1</SelectItem>
                          <SelectItem value="model-2">Model 2</SelectItem>
                          <SelectItem value="model-3">Model 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="batch_date"
                  render={({ field }) => (
                    <FormItem>
                      <DatePicker
                        value={form.getValues("batch_date")}
                        onChange={(date) => {
                          field.onChange(date);
                          field.value = date;
                          field.name = "batch_date";
                          field.disabled = false;
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        className="bg-white rounded w-full py-2 px-4 text-gray-700 focus:bg-white focus:border-yellow-700"
                        onChange={(e) => {
                          field.onChange(+e.target.value);
                          field.value = +e.target.value;
                          field.name = "quantity";
                          field.disabled = false;
                        }}
                        min={1}
                        placeholder="Quantity"
                        type="number"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="license_level"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(+value);
                          field.value = +value;
                          field.name = "license_level";
                          field.disabled = false;
                        }}
                      >
                        <SelectTrigger className="bg-white rounded text-black">
                          <SelectValue
                            className="text-black placeholder:text-black"
                            placeholder="License Level"
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900 text-sm rounded-lg focus:border-blue-500 w-full p-2.5  dark:border-gray-600">
                          {Array.from({ length: 9 }, (_, i) => (
                            <SelectItem
                              className="text-black"
                              value={(i + 1).toString()}
                              key={i}
                            >
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        className="bg-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:bg-white focus:border-yellow-700"
                        {...field}
                        placeholder="Comment (Not Required)"
                        min={1}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <button
                type="submit"
                className="shadow bg-yellow-800 hover:bg-yellow-700 focus:shadow-outline w-full focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
