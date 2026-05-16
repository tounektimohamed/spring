interface LessonContentProps {
  html: string;
}

export function LessonContent({ html }: LessonContentProps) {
  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
