import Link from "next/link";
import { getNotes } from "../services/notes";
import { Suspense } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ important?: string }>;
}) {
  return (
    <Suspense>
      <NoteContent searchParams={params} />
    </Suspense>
  );
}

const NoteContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ important?: string }>;
}) => {
  const { important } = await searchParams;
  const showImportant = important === "true";
  const allNotes = getNotes();
  const notes = showImportant
    ? allNotes.filter((note) => note.important)
    : allNotes;

  return (
    <div>
      <h2>Notes</h2>
      <Link href={showImportant ? "/notes" : "/notes?important=true"}>
        {showImportant ? "show all" : "show important"}
      </Link>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`notes/${note.id}`}>{note.content}</Link>
            {note.important && <strong>(important)</strong>}
          </li>
        ))}
      </ul>
    </div>
  );
};
