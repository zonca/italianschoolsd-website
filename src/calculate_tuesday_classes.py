from datetime import date, timedelta


def count_tuesday_classes(start_date, end_date, skip_week):
    current_date = start_date
    tuesday_count = 0

    while current_date <= end_date:
        if current_date.weekday() == 1:  # Tuesday
            if not (skip_week[0] <= current_date <= skip_week[1]):
                tuesday_count += 1
        current_date += timedelta(days=1)

    return tuesday_count


# Define the date range and skip week
start_date = date(2026, 1, 19)  # Start on January 19, 2026
end_date = date(2026, 5, 31)  # End on May 31, 2026
skip_week = (date(2026, 4, 1), date(2026, 4, 7))  # Skip first week of April

# Calculate the number of classes
num_classes = count_tuesday_classes(start_date, end_date, skip_week)
print(f"Number of Tuesday classes: {num_classes}")
