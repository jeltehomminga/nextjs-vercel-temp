export const timeRecords = [
  {
    id: '1',
    name: 'Jelte',
    category: 'work',
    project: 'project4',
    hours: 4,
    week: '40',
    date: '10-9-2015',
    day: 'monday',
  },
  {
    id: '1',
    name: 'Jelte',
    category: 'verlof',
    project: null,
    hours: 8,
    week: '40',
    date: '11-9-2015',
    day: 'tuesday',
  },
  {
    id: '1',
    name: 'Jelte',
    category: 'work',
    project: 'project6',
    hours: 4,
    week: '40',
    date: '13-9-2015',
    day: 'wednesday',
  },
  {
    id: '1',
    name: 'Jelte',
    category: 'work',
    project: 'project5',
    hours: 4,
    week: '41',
    date: '14-9-2015',
    day: 'thursday',
  },
  {
    id: '1',
    name: 'Jelte',
    category: 'work',
    project: 'project5',
    hours: 4,
    week: '41',
    date: '14-9-2015',
    day: 'friday',
  },
  {
    id: '2',
    name: 'Jelte',
    category: 'work',
    project: 'project4',
    hours: 4,
    week: '40',
    date: '10-9-2015',
    day: 'monday',
  },
  {
    id: '2',
    name: 'Jelte',
    category: 'verlof',
    project: null,
    hours: 8,
    week: '40',
    date: '11-9-2015',
    day: 'tuesday',
  },
  {
    id: '2',
    name: 'Jelte',
    category: 'work',
    project: 'project6',
    hours: 4,
    week: '40',
    date: '13-9-2015',
    day: 'wednesday',
  },
  {
    id: '1',
    name: 'Jelte',
    category: 'work',
    project: 'project5',
    hours: 4,
    week: '41',
    date: '14-9-2015',
    day: 'thursday',
  },
  {
    id: '2',
    name: 'Jelte',
    category: 'work',
    project: 'project5',
    hours: 4,
    week: '41',
    date: '14-9-2015',
    day: 'friday',
  },
]

export const defaultTimeRecord = {
  name: '',
  category: '',
  project: '',
  hours: null,
  week: '',
  date: '',
}

export const defaultWeek = {
  monday: { ...defaultTimeRecord },
  tuesday: { ...defaultTimeRecord },
  wednesday: { ...defaultTimeRecord },
  thursday: { ...defaultTimeRecord },
  friday: { ...defaultTimeRecord },
}

const defaultWeekRecord = {
  date: '',
  category: '',
  monday: '',
  tuesday: '',
  wednesday: '',
  thursday: '',
  friday: '',
}

export const fakeData = []
timeRecords.map((tr) => {
  const match = fakeData.find((el) => el.id === tr.id)
  if (match) {
    match[tr.day] = tr.hours
  } else {
    const { hours: _, ...rest } = tr
    fakeData.push({ ...rest, [tr.day]: tr.hours })
  }
})
