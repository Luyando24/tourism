import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useCurrency, currencies, Currency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface CurrencyTogglerProps {
  className?: string;
}

const CurrencyToggler: React.FC<CurrencyTogglerProps> = ({ className }) => {
  const { currentCurrency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (currency: Currency) => {
    setCurrency(currency);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
            className
          )}
        >
          <Globe className="size-4" />
          <span className="hidden sm:inline">{currentCurrency.code}</span>
          <span className="sm:hidden">{currentCurrency.symbol}</span>
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => handleCurrencyChange(currency)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              currentCurrency.code === currency.code && "bg-accent"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{currency.symbol}</span>
              <span className="text-sm">{currency.code}</span>
            </div>
            <span className="text-xs text-muted-foreground">{currency.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencyToggler;