# xlsx_to_csv_yaml

xlsx_to_csv_yaml は、エクセル ファイル (.xlsx) のすべてのシートを YAML+CSV 形式に変換します。 


## インストール

xlsx_to_csv_yaml を使うには Node.js のインストールが必要です。

Windows の場合

    xlsx_to_csv_yaml をダウンロードして展開します:
        - https://github.com/Takakiriy/xlsx_to_csv_yaml >> Code >> Download.ZIP

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0-x64.exe）を開きます
        - インストール オプションはデフォルトを使用

    xlsx_to_csv_yaml が使うパッケージをインストールします:
        - Windows スタート >> PowerShell
        - npm install -g  xlsx  indent-string

    xlsx_to_csv_yaml.bat ファイルをダブルクリックすると xlsx_to_csv_yaml が起動します:

mac の場合

    xlsx_to_csv_yaml をダウンロードして展開します:
        - https://github.com/Takakiriy/xlsx_to_csv_yaml >> Code >> Download.ZIP

    Node.js をインストールします:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - ダウンロードしたファイル（例：node-v14.16.0.pkg）を開きます
        - インストール オプションはデフォルトを使用

    xlsx_to_csv_yaml が使う xlsx, indent-string パッケージをインストールします:
        - Launchpad >> Terminal
        - npm install  xlsx  indent-string

    xlsx_to_csv_yaml.command ファイルに実行属性を追加します:
        - chmod +x xlsx_to_csv_yaml.command

    xlsx_to_csv_yaml.command ファイルをダブルクリックすると xlsx_to_csv_yaml が起動します:


## 使い方

Windows の場合、xlsx_to_csv_yaml.bat をダブルクリックして、下記のように入力します。

    input .xlsx file path> example.xlsx

ファイル パス は、キーボードから入力しなくても、
ファイルをドラッグ＆ドロップして入力できます。

入力したファイルがあるフォルダーに example.csv.yaml ファイルができます。
内容は YAML 形式で、キーがシート名、値が CSV になります。

    シート1: |
        CSV,1,2,3
        a,b,c,d
    シート2: |
        CSV,1,2,3
        a,b,c,d
