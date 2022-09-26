type EventName = 'click';
type EventId = string;
type SubscribeKey = `@${EventName}:${EventId}`;
type SubscribeFunction = (...arg: any) => void;
type SubscriberMap = Map<SubscribeKey, SubscribeFunction[]>;

export class OnEmit {
  private subscriberMap: SubscriberMap = new Map();

  public on(subscribeKey: SubscribeKey, subscribeFunction: SubscribeFunction) {
    const hasOnSubscribed = this.subscriberMap.has(subscribeKey);

    if (hasOnSubscribed) {
      const prevSubscribedFunctions = this.subscriberMap.get(subscribeKey)!;
      this.subscriberMap.set(subscribeKey, [
        ...prevSubscribedFunctions,
        subscribeFunction,
      ]);
    } else {
      this.subscriberMap.set(subscribeKey, [subscribeFunction]);
    }
  }

  protected emit(subscribeKey: SubscribeKey, ...arg: any) {
    const subscribedFunctions = this.subscriberMap.get(subscribeKey);
    if (!subscribedFunctions) return;

    subscribedFunctions.forEach(fn => fn(arg));
  }
}
