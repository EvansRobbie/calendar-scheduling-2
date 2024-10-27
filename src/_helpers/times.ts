import {
  eachMinuteOfInterval,
  endOfDay,
  startOfDay
} from 'date-fns';

export const times = () => {
  const startDate = startOfDay(new Date());
  const endDate = endOfDay(startDate);
  return eachMinuteOfInterval({ start: startDate, end: endDate }, { step: 15 });
};
