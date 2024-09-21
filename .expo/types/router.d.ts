/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/dailyqt` | `/form` | `/home` | `/setting` | `/source` | `/sunday` | `/thanks`;
      DynamicRoutes: `/dailyqtDetail/${Router.SingleRoutePart<T>}` | `/sourceDetail/${Router.SingleRoutePart<T>}` | `/sundayDetail/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/dailyqtDetail/[date]` | `/sourceDetail/[date]` | `/sundayDetail/[date]`;
    }
  }
}