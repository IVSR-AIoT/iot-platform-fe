import { DatePicker, Select } from 'antd'
import PropTypes from 'prop-types'

const { RangePicker } = DatePicker

export default function FilterMenu({ setDateRange, projectOption, setSelectedProject }) {
  return (
    <div className="grid lg:grid-cols-3 lg:place-content-center lg:place-items-center mb-5 md:grid-cols-1 md:place-items-start gap-2">
      <div className="relative w-[250px]">
        <Select
          options={projectOption}
          maxTagCount={'responsive'}
          className="w-full h-[40px] "
          onChange={(value) => {
            setSelectedProject(value)
          }}
          allowClear
        />
        <strong className="absolute text-sm text-gray-500 dark:text-gray-400 -top-3 -left-2 bg-[#fff] scale-75 px-2">
          Select project
        </strong>
      </div>
      <div className="relative w-[250px]">
        <RangePicker
          className="h-[40px] w-full "
          onChange={(_, value) => setDateRange({ startDate: value[0], endDate: value[1] })}
        />
        <strong className="absolute text-sm text-gray-500 dark:text-gray-400 -top-3 -left-2 bg-[#fff] scale-75 px-2">
          Select date
        </strong>
      </div>
    </div>
  )
}

FilterMenu.propTypes = {
  setSelectedProject: PropTypes.func.isRequired,
  setDateRange: PropTypes.func.isRequired,
  projectOption: PropTypes.array.isRequired
}
