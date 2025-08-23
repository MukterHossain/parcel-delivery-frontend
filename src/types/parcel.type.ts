// export interface Root {
//   statusCode: number
//   success: boolean
//   message: string
//   data: Daum[]
//   meta: Meta
// }

export const PARCEL_STATUS = {
    REQUESTED : "REQUESTED",
    APPROVED : "APPROVED",
    DISPATCHED : "DISPATCHED",
    IN_TRANSIT : "IN_TRANSIT",
    DELIVERED : "DELIVERED",
    CANCELED : "CANCELED",
    BLOCKED : "BLOCKED",
    UNBLOCKED : "UNBLOCKED",
} as const;
export interface IParcelPackage {
  _id: string
  sender: string
  receiver: string
  type: string
  weight: number
  trackingId: string
  pickupAddress: string
  deliveryAddress: string
  status: string
  statusLogs: StatusLog[]
  isBlocked: boolean
  createdAt: string
  updatedAt: string
}

export interface StatusLog {
  status: string
  location?: string
  note: string
  updatedBy: string
  timestamp: string
}

export interface Meta {
  total: number
}