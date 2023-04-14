export class Trip {
    id: string;
    NickName?: string;
    PickUp?: string;
    Destination?: string;
    Status?: string;
    Amount?: string;
    Commission?: string;
    AcceptDate?:string | Date;
    ActualPickup?:string;
    AmountTendered?:string;
    Customer?:string;
    Phone?:string;
    TripValue?: string;   
}

//To do change status to enum

// AcceptDate: Timestamp {seconds: 1577864023, nanoseconds: 640000000}
// ActualPickup: GeoPoint {_lat: 0.5891307, _long: 34.5675479}
// AmountTendered: "750"
// ArriveTime: Timestamp {seconds: 1577864026, nanoseconds: 15000000}
// Commission: 150
// Customer: "pZiaDS6vVMV1CgClFHvoX7ascTN2"
// Destination: "Namilama Primary School"
// DestinationLoc: GeoPoint {_lat: 0.6943901, _long: 34.5822548}
// Driver: "GZtRPTH82DMdgzmxibXbtLuBtMu1"
// DropLocation: GeoPoint {_lat: 0.6650539, _long: 34.5585496}
// Email: "ekiliswa@gmail.com"
// EndTime: Timestamp {seconds: 1577865793, nanoseconds: 118000000}
// NickName: "Mapesa"
// PayStatus: "Paid"
// Phone: "0737006228"
// PickupLoc: GeoPoint {_lat: 0.5757173999999999, _long: 34.5642335}
// PickupName: "Bungoma Bible School"
// StartTime: Timestamp {seconds: 1577864027, nanoseconds: 425000000}
// TripDuration: 28
// TripID: "08WmmIrS1Ok2f3R1EYBD"
// TripStatus: "Ended"
// TripValue: 750
// id: "pZiaDS6vVMV1CgClFHvoX7ascTN2"