import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPeopleProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  listItems: string;
  context: WebPartContext;
}
