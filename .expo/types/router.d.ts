/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/chooseBibleSec` | `/dailyListPg` | `/dailyqt` | `/form` | `/home` | `/savedBible` | `/setting` | `/source` | `/sunday` | `/sundayListPg` | `/thanks`;
      DynamicRoutes: `/dailyqtDetail/${Router.SingleRoutePart<T>}` | `/sundayDetail/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/dailyqtDetail/[date]` | `/sundayDetail/[date]`;
    }
  }
}
