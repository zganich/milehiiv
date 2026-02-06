import Link from 'next/link';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ href, variant = 'primary', children, onClick }: ButtonProps) {
  const className = `btn btn-${variant}`;
  
  if (href) {
    return <Link href={href} className={className}>{children}</Link>;
  }
  
  return <button className={className} onClick={onClick}>{children}</button>;
}
