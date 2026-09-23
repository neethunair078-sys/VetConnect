import { ChevronLeft, ChevronRight } from "lucide-react";

const AppointmentCalendar = ({
  currentMonth,
  selectedDate,
  availableDates,
  onMonthChange,
  onDateSelect,
}) => {
  const year = currentMonth.getFullYear();

  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const createDateKey = (day) => {
    const m = String(month + 1).padStart(2, "0");

    const d = String(day).padStart(2, "0");

    return `${year}-${m}-${d}`;
  };

  return (
    <div
      className="
        rounded-[26px]

        bg-white

        border
        border-vet-border

        p-5
        sm:p-6
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <button
          type="button"
          onClick={() => onMonthChange(-1)}
          className="
            w-8
            h-8

            rounded-full

            flex
            items-center
            justify-center

            cursor-pointer

            hover:bg-vet-background-soft

            transition
          "
        >
          <ChevronLeft size={18} />
        </button>

        <h3
          className="
            font-semibold
            text-vet-text-primary
          "
        >
          {monthName} {year}
        </h3>

        <button
          type="button"
          onClick={() => onMonthChange(1)}
          className="
            w-8
            h-8

            rounded-full

            flex
            items-center
            justify-center

            cursor-pointer

            hover:bg-vet-background-soft

            transition
          "
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekdays */}

      <div
        className="
          grid
          grid-cols-7

          mt-6
        "
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="
              text-center

              text-[11px]

              text-[#8B7E77]

              font-medium
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}

      <div
        className="
          grid
          grid-cols-7

          gap-y-2

          mt-3
        "
      >
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-9" />;
          }

          const today = new Date();

          const todayKey = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, "0"),
            String(today.getDate()).padStart(2, "0"),
          ].join("-");



          const dateKey = createDateKey(day);

          const isPast = dateKey < todayKey;

          const available = availableDates.includes(dateKey) && !isPast;

          const selected = selectedDate === dateKey;

          return (
            <div
              key={day}
              className="
                flex
                justify-center
              "
            >
              <button
                type="button"
                disabled={!available}
                onClick={() => onDateSelect(dateKey)}
                className={`
                  w-9
                  h-9

                  rounded-full

                  text-xs

                  transition

                  ${
                    selected
                      ? `
                        bg-vet-primary-dark
                        text-white
                        font-semibold
                      `
                      : available
                        ? `
                        text-vet-text-primary
                        cursor-pointer
                        hover:bg-[#F6EADF]
                      `
                        : `
                        text-[#C8C0BB]
                        cursor-not-allowed
                      `
                  }
                `}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend */}

      <div
        className="
          mt-6

          flex
          flex-wrap

          gap-4

          text-xs

          text-vet-text-secondary
        "
      >
        <div className="flex items-center gap-2">
          <span
            className="
              w-2.5
              h-2.5

              rounded-full

              bg-vet-primary-dark
            "
          />
          Selected
        </div>

        <div className="flex items-center gap-2">
          <span
            className="
              w-2.5
              h-2.5

              rounded-full

              border
              border-[#B98A68]
            "
          />
          Available
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
