import { useDeliveryHistoryQuery } from "@/redux/feature/receiver/receiver.api"


export default function DeliveryHistory() {
    const {data: deliveryHistory } = useDeliveryHistoryQuery(undefined)
    console.log("deliveryHistory", deliveryHistory)
  return (
    <div>
      <p>Delivery History</p>
    </div>
  )
}
