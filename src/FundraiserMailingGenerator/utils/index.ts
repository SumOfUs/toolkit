interface DonorSuggestedAmountsMarkup {
  url: string;
  locale: string;
  rates: number[];
  multipliers: number[];
  recurringDefault: boolean;
  oneClick: boolean;
  buttonTemplate: string;
  otherAmountTemplate: string;
  styles?: any;
}
export const donorSuggestedAmountsMarkup = (
  options: DonorSuggestedAmountsMarkup
) => {};
