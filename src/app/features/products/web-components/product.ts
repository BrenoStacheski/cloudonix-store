export interface Product {
  profile: {
    type?: 'furniture' | 'equipment' | 'stationary' | 'part';
    available?: boolean;
    backlog?: number | null;
    customProperties?: {},
  };
}
