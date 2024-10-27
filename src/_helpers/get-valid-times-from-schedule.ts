export const getValidTimesFromSchedule = async (timesInOrder: Date[], event: {durationInMinutes: string}) => {
  const start = timesInOrder[0]
  const end =timesInOrder.at(-1)
  if(start === null || end === null) {
    return []
  }
  
}