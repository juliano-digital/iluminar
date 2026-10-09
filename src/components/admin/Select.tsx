import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#A0A0A0]">
          {label}
        </label>
        <select
          ref={ref}
          className={`
            w-full px-4 py-2.5 bg-[#141414] border border-[#2A2A2A] rounded-lg
            text-[#F5F5F5] appearance-none cursor-pointer
            focus:outline-none focus:border-[#B8FF00]/50 focus:shadow-[0_0_16px_rgba(184,255,0,0.1)]
            transition-all duration-300
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_16px_rgba(239,68,68,0.1)]' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="" className="bg-[#141414]">Selecione um serviço</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#141414]">
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
