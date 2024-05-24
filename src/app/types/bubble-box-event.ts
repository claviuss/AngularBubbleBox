export interface GenericBubbleBoxEvent<T = any> {
    eventType: 'warning' | 'error' | 'info' | 'debug' | 'topic';
    topic?: string;
    targetAudience:
    | 'component-internal'
    | 'business-unit-internal'
    | 'company-internal'
    | 'external-partner'
    | 'external-public';
    category: string;
    compatibility_mode: 'compatible' | 'forward' | 'none';
    payload: T;
}

export function isGenericBubbleBoxEvent<T = any>(obj: any): obj is GenericBubbleBoxEvent<T> {
    return (
        (obj.eventType === 'warning' ||
            obj.eventType === 'error' ||
            obj.eventType === 'info' ||
            obj.eventType === 'debug' ||
            obj.eventType === 'topic') &&
        obj.payload !== undefined
    );
}

export interface HydratedGenericBubbleBoxEvent<T = any> extends GenericBubbleBoxEvent<T> {
    readonly owningApplication: string;
    readonly createdAt: Date;
    // add app version number
}

export interface WarningBubbleBoxEvent extends HydratedGenericBubbleBoxEvent<{ message: string }> {
    eventType: 'warning';
}
export function isWarningBubbleBoxEvent(obj: any): obj is WarningBubbleBoxEvent {
    return obj.eventType === 'warning';
}

export interface ErrorBubbleBoxEvent
    extends HydratedGenericBubbleBoxEvent<{
        message: string;
        stackOverflow: string;
    }> {
    eventType: 'error';
}
export function isErrorBubbleBoxEvent(obj: any): obj is ErrorBubbleBoxEvent {
    return obj.eventType === 'error';
}
export interface InfoBubbleBoxEvent<T = any> extends HydratedGenericBubbleBoxEvent<T> {
    eventType: 'info';
    payload: T;
}
export function isInfoBubbleBoxEvent<T = any>(obj: any): obj is InfoBubbleBoxEvent<T> {
    return obj.eventType === 'info';
}

export interface DebugBubbleBoxEvent<T = any> extends HydratedGenericBubbleBoxEvent<T> {
    eventType: 'debug';
    payload: T;
}
export function isDebugBubbleBoxEvent<T = any>(obj: any): obj is DebugBubbleBoxEvent<T> {
    return obj.eventType === 'debug';
}

export interface TopicBubbleBoxEvent<T = any> extends HydratedGenericBubbleBoxEvent<T> {
    eventType: 'topic';
    payload: T;
}
export function isTopicBubbleBoxEvent<T = any>(obj: any): obj is TopicBubbleBoxEvent<T> {
    return obj.eventType === 'topic';
}

export type IframeEvent = WarningBubbleBoxEvent | ErrorBubbleBoxEvent | InfoBubbleBoxEvent | DebugBubbleBoxEvent | TopicBubbleBoxEvent;


export interface MoonPhasePayload {
    id: number;
    title: string;
    description: string;
    picture: string;
    icon: string;
}

export interface MoonPhaseReqPayload {
    date: string;
    name: string;
    message: string;
}

export interface MoonPhaseLoaderPayload {
    loading: boolean;
}

export function isMoonPhaseEvent(obj: any): obj is TopicBubbleBoxEvent<MoonPhasePayload> {
    return obj.eventType === 'topic' && Object.keys(obj.payload).includes('title') && Object.keys(obj.payload).includes('description') && Object.keys(obj.payload).includes('picture');
}

export function isMoonPhaseReqEvent(obj: any): obj is TopicBubbleBoxEvent<MoonPhaseReqPayload> {
    return obj.eventType === 'topic' && Object.keys(obj.payload).includes('date') && Object.keys(obj.payload).includes('name') && Object.keys(obj.payload).includes('message');
}

export function isMoonPhaseLoaderEvent(obj: any): obj is TopicBubbleBoxEvent<MoonPhaseLoaderPayload> {
    return obj.eventType === 'topic' && Object.keys(obj.payload).includes('loading');
}