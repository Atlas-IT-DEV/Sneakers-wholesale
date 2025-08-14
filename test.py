import requests
import time
def get_deals():
    # Первый запрос для получения export_id
    response = requests.get(
        "https://kamyshnikov.getcourse.ru/pl/api/account/deals",
        params={
            "key": "fvFv4Fln9VRXmZ514s59tW5Rlf1DZSUoqkM12F3992SeK1PUbInNZxbWcEjSl0VSS9544Oih0omFDrVsspKBxFLVHNiQKdaljjc9hB7wGPaT9tQ7eq8MOkFplC3DsdDN",
            "created_at[from]": "2025-05-01"
        }
    )
    export_info = response.json()
    
    # Второй запрос для получения результатов экспорта
    export_id = export_info['info']['export_id']
    time.sleep(10)
    get_export_response = requests.get(
        f"https://kamyshnikov.getcourse.ru/pl/api/account/exports/{export_id}",
        params={
            "key": "fvFv4Fln9VRXmZ514s59tW5Rlf1DZSUoqkM12F3992SeK1PUbInNZxbWcEjSl0VSS9544Oih0omFDrVsspKBxFLVHNiQKdaljjc9hB7wGPaT9tQ7eq8MOkFplC3DsdDN"
        }
    )
    export_result = get_export_response.json()
    
    print(export_result)

# Вызов функции
get_deals()