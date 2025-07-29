export interface KeyValue {
    key: number;
    value: string;
  }
  
export type ProductOptionsResult = {
    shippingOptions: KeyValue[];
    availabilityStatusOptions: KeyValue[];
    returnPolicyOptions: KeyValue[];
    warrantyOptions: KeyValue[];
  };
  