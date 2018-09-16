import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { formatCurrency } from '../calculations';
import { Section, TaxRow } from './Ui';


const messages = defineMessages({
  header: {id: 'summary.header', defaultMessage: 'Summary'},
  turnover: {id: 'summary.turnover', defaultMessage: 'Turnover'},
  income: {id: 'summary.income', defaultMessage: 'Income'},
  commonIncome: {id: 'summary.common.income', defaultMessage: 'Common income'},
  totalTax: {id: 'summary.total.tax', defaultMessage: 'Total tax'},
  afterTax: {id: 'summary.after.tax', defaultMessage: 'After tax'},
});

export const SummaryComponent = ({turnover, income, commonIncome, totalTax, afterTax, intl: {formatMessage}}) => {
  return (
    <Section header={formatMessage(messages.header)} expanded>
      <Table>
        <TableBody>
          <TaxRow description={formatMessage(messages.turnover)} amount={formatCurrency(turnover)} />
          <TaxRow description={formatMessage(messages.income)} amount={formatCurrency(income)} />
          <TaxRow description={formatMessage(messages.commonIncome)} amount={formatCurrency(commonIncome)} />
          <TaxRow description={formatMessage(messages.totalTax)} amount={formatCurrency(totalTax)} minus />
          <TaxRow description={formatMessage(messages.afterTax)} amount={formatCurrency(afterTax)} total />
        </TableBody>
      </Table>
    </Section>
);
};

SummaryComponent.propTypes = {
  turnover: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  commonIncome: PropTypes.number.isRequired,
  totalTax: PropTypes.number.isRequired,
  afterTax: PropTypes.number.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = ({calculations: {tax: {commonIncome, totalTax, afterTax}, salary: {turnover, income}}}) => ({
  turnover, income, commonIncome, totalTax, afterTax,
});

const mapDispatchToProps = () => ({});

export const Summary = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SummaryComponent));
export default Summary;