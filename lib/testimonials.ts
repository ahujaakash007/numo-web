// Social proof shown on the plan / paywall page.
// NOTE: Sample copy — believable Indian reviews. Replace with REAL user quotes
// (with consent) before scaling ad spend.
export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  result: string;
  stars: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Honestly thought I'd delete it in a week. 7 kg down in 3 months — the photo scan made logging effortless.",
    name: 'Priya S.',
    city: 'Pune',
    result: '−7 kg',
    stars: 5,
  },
  {
    quote: 'As a vegetarian I could never track properly. Numo nails Indian portions — dal, sabzi, roti. Lost 5 kg without the gym.',
    name: 'Rohan M.',
    city: 'Bengaluru',
    result: '−5 kg',
    stars: 5,
  },
  {
    quote: 'I eat out a lot for work. Snapping a photo instead of guessing changed everything. Down 9 kg since February.',
    name: 'Aditya K.',
    city: 'Gurgaon',
    result: '−9 kg',
    stars: 5,
  },
  {
    quote: 'The ₹1 trial got me in, the results kept me. 4 kg in six weeks and finally consistent.',
    name: 'Meghana R.',
    city: 'Hyderabad',
    result: '−4 kg',
    stars: 5,
  },
];
