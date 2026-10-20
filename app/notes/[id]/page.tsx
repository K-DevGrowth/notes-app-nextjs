import { toggleNoteImportant } from "@/app/actions/notes";
import { getNoteById } from "@/app/services/notes";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  return (
    <Suspense>
      <NoteContent params={params} />
    </Suspense>
  );
}

const NoteContent = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  const note = getNoteById(Number(id));

  if (!note) {
    notFound();
  }

  return (
    <div>
      <h2>{note.content}</h2>
      <p>{note.important ? "Important" : "Not important"}</p>
      <form action={toggleNoteImportant}>
        <input type="hidden" name="id" value={note.id} />
        <button type="submit">
          {note.important ? "Mask as not important" : "Mask as important"}
        </button>
      </form>
    </div>
  );
};
