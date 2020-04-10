#### Template

**parameters**:

* List of all original contents
  We consider more sophisticated/dynamic approach when this one will be a performance buttleneck.
  Meanwhile more complicated approaches don't worth development/integration time.

  \
  **Structure**: 

    ```js
    [  
        {  
            "id": "original content id, uniq",
            "language": "original content language",
            "title": "original content title"
        },
    ]
    ```
  Example:

    ```js
    [
        {
            "id": "uniq-string-1",
            "language": "en",
            "title": "First Blog Post",
        },
        {
            "id": "uniq-string-2",
            "language": "ru",
            "title": "Первое сообщение в блоге",
        },
    ]
    ```

* List of languages   
    
  Example:
    
    ```js
       ["en", "es", "ru", "he",]
    ```

#### REST API

* Request content and translations.
  NOTE that translations can be auto-generated if the manual translation is absent.
  \
  **Route**: `GET $root/contents/translations?srcId={original content Id}&languages={comma separated list of languages}`
  Example: `GET admin/contents/translations?srcId=ewew4rdsfssf4&tr=ru`
  \
  **Response**:
  ```js
  {
      "id": "original content id, uniq",
      "language": "original content language",
      "title": "original content title",
      "content": "text of the content",
      "translations": [
          {
              "id": "translation id, uniq",
              "srcId": "original content id",
              "language": "translation language",
              "title": "title of translated content in the translation language",
              "status": "translation status. valuses: DRAFT/READY"
              "content": "text of the translation",
          },
      ]
  }
  ```
  Example:
  ```js
  {
      "id": "uniq-string-1",
      "language": "en",
      "title": "First Blog Post",
      "content": "Some meaningful text",
      "translations": [
          {
              "id": "uniq-string-2",
              "srcId": "uniq-string-1",
              "language": "ru",
              "title": "Первое сообщение в блоге",
              "status": "DRAFT",
              "content": "Какой-то значимый текст",
          },
      ]
  }
  ```

* Send translation to the server

  **Route**: `POST $root/contents/translations`
  Example: `POST admin/contents/translations`
  \
  **Request Body**:
  ```js
  {
      "id": "translation id, uniq",
      "srcId": "original content id",
      "language": "translation language",
      "title": "title of translated content in the translation language",
      "status": "translation status. valuses: DRAFT/READY"
      "content": "text of the translation",
  }
  ```
  Example:
  ```js
  {
      "id": "uniq-string-2",
      "srcId": "uniq-string-1",
      "language": "ru",
      "title": "Первое сообщение в блоге",
      "status": "DRAFT",
      "content": "Какой-то значимый текст в новом переводе",
  },
  ```

#### Open issues

* instead of REST API we can use two POST requests
  * one for pushing selected content id and target language
  * second for pushing the translation to the server

  

    
      
