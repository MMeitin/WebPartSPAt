import * as React from 'react';
import { IPeopleProps } from './IPeopleProps';
import { PeopleLayout } from './PeopleLayout';

export default class People extends React.Component<IPeopleProps, {}> {
  public render(): React.ReactElement<IPeopleProps> {
    const {
      listItems,
      context
    } = this.props;

    return (
      <PeopleLayout
        listItems={listItems}
        context={context} />
    );
  }
}
