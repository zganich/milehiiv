import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'glass' | 'solid' | 'elevated';
}

export function Card({ 
  children, 
  className, 
  hover = false, 
  padding = 'md',
  variant = 'glass'
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const variants = {
    glass: 'card',
    solid: 'card-solid',
    elevated: 'bg-white shadow-xl border-0 rounded-2xl'
  };

  const hoverClasses = hover ? 'card-hover' : '';

  return (
    <div
      className={cn(
        variants[variant],
        hoverClasses,
        paddingClasses[padding],
        'fade-in',
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('text-gray-600', className)}>
      {children}
    </div>
  );
}
