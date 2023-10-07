import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';

const yuan = (val: number | string) => `¥ ${numeral(val).value()}`;

const Charts = {
  yuan,
  ChartCard,
  Field,
};

export { Charts as default, yuan, ChartCard, Field };
