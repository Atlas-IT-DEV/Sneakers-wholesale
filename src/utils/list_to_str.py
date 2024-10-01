from src.utils.custom_logging import setup_logging

log = setup_logging()


def encode_list_to_string(numbers_list):
    """
    Функция принимает список чисел и возвращает строку,
    где числа разделены запятыми.

    Args:
        numbers_list (list): Список чисел.

    Returns:
        str: Строка, содержащая числа, разделенные запятыми.
    """
    # Преобразуем каждый элемент списка в строку и объединяем их через запятую
    return ','.join(map(str, numbers_list))


def decode_string_to_list(numbers_string):
    """
    Функция принимает строку и возвращает список чисел,
    поддерживая как формат "число,число,...", так и строку с одним числом.
    Если строка None, возвращается пустой список.

    Args:
        numbers_string (str): Строка, содержащая числа, разделенные запятыми или одно число.

    Returns:
        list: Список чисел или пустой список, если строка None.

    Raises:
        ValueError: Если строка не соответствует формату.
    """
    # Если строка None, возвращаем пустой список
    if numbers_string is None:
        return []

    # Проверяем, что строка содержит хотя бы одно число
    if not numbers_string or not numbers_string.replace(',', '').isdigit():
        raise ValueError("Строка не соответствует формату 'число,число,...' или 'число'")

    # Если в строке нет запятых, значит она содержит одно число
    if ',' not in numbers_string:
        return [int(numbers_string)]

    # Если в строке есть запятые, разбиваем по запятым и преобразуем в числа
    return [int(num) for num in numbers_string.split(',')]
