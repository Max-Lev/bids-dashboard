export interface KeyValue {
    key: number;
    value: string;
  }
  
export type ProductOptionsResult = {
  availabilityStatusOptions: KeyValue[];

    shippingOptions: KeyValue[];
    returnPolicyOptions: KeyValue[];
    warrantyOptions: KeyValue[];
    brandOptions: KeyValue[];
  };
  