"use server";

import { redirect } from "next/navigation";
import { addNote, toggleImportant } from "../services/notes";
import { revalidatePath } from "next/cache";

export const createNote = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const important = formData.get("important") === "on";
  addNote(content, important);

  revalidatePath("/notes");
  redirect("/notes");
};

export const toggleNoteImportant = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  toggleImportant(id);
  revalidatePath(`/notes/${id}`);
  redirect(`/notes`);
};
