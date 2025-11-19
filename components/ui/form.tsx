import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}

export function FormGroup({ children, className = '' }: FormGroupProps) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

interface FormLabelProps {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}

export function FormLabel({ htmlFor, required, children }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-gray-700"
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function FormInput({ error, className = '', ...props }: FormInputProps) {
  return (
    <>
      <input
        className={`
          w-full px-4 py-2.5 border rounded-lg transition-all duration-200
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && <FormError>{error}</FormError>}
    </>
  );
}

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function FormTextarea({ error, className = '', ...props }: FormTextareaProps) {
  return (
    <>
      <textarea
        className={`
          w-full px-4 py-2.5 border rounded-lg transition-all duration-200 resize-none
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && <FormError>{error}</FormError>}
    </>
  );
}

interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  error?: string;
  children: ReactNode;
}

export function FormSelect({ error, className = '', children, ...props }: FormSelectProps) {
  return (
    <>
      <select
        className={`
          w-full px-4 py-2.5 border rounded-lg transition-all duration-200
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <FormError>{error}</FormError>}
    </>
  );
}

interface FormHelpTextProps {
  children: ReactNode;
}

export function FormHelpText({ children }: FormHelpTextProps) {
  return <p className="text-xs text-gray-500 mt-1">{children}</p>;
}

interface FormErrorProps {
  children: ReactNode;
}

export function FormError({ children }: FormErrorProps) {
  return (
    <p className="text-xs text-red-600 mt-1 flex items-center">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  );
}

interface FormCardProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export function FormCard({ children, title, description }: FormCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      {(title || description) && (
        <div className="border-b border-gray-200 px-6 py-5">
          {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

interface FormActionsProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
}

export function FormActions({ children, align = 'right' }: FormActionsProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`flex items-center space-x-4 pt-6 border-t border-gray-200 ${alignClasses[align]}`}>
      {children}
    </div>
  );
}
