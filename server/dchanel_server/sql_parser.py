import re


def parse_table_name_from_query(query: str) -> str:
    table_name_matcher = re.compile(r"from (\w[0-9\w_]+)")
    match = table_name_matcher.search(query)
    return match.group(1)


def parse_selected_columns_from_query(query: str) -> list[str]:
    """
    Returns list of columns being selected or an empty list if all columns are
    being selected; undefined behavior if invalid query
    """
    select_columns_matcher = re.compile(r"select (.*?)\w*\n?from")
    match = select_columns_matcher.search(query)
    columns = match.group(1)
    if (columns == "*"):
        return []

    return columns.split("\n")
