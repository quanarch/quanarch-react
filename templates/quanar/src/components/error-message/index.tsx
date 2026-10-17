export interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p role="alert" style={{ color: '#b42318' }}>
      {message}
    </p>
  );
}
