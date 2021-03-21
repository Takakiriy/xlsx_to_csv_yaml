# xlsx_to_csv_yaml

xlsx_to_csv_yaml converts all sheets in the Excel file (.xlsx) to YAML+CSV format.

[日本語 README](./README-jp.md)


## Install

To use xlsx_to_csv_yaml, you must install Node.js.

For Windows:

    Download and expand xlsx_to_csv_yaml:
        - https://github.com/Takakiriy/xlsx_to_csv_yaml >> Code >> Download.ZIP

    Install Node.js:
        - https://nodejs.org/ja/download/ >> Windows Installer (.msi) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0-x64.exe)
        - Installation options are defaults

    Install packages used by xlsx_to_csv_yaml:
        - Windows Start >> PowerShell
        - npm install -g  xlsx  indent-string

    To start xlsx_to_csv_yaml, double click xlsx_to_csv_yaml.bat file:

For mac:

    Download and expand xlsx_to_csv_yaml:
        - https://github.com/Takakiriy/xlsx_to_csv_yaml >> Code >> Download.ZIP

    Install Node.js:
        - https://nodejs.org/ja/download/ >> macOS Installer (.pkg) >> 64-bit
        - Open the downloaded file (e.g. node-v14.16.0.pkg)
        - Installation options are defaults

    Install packages used by xlsx_to_csv_yaml:
        - Launchpad >> Terminal
        - npm install -g  xlsx  indent-string

    Add execution attributes to "xlsx_to_csv_yaml.command" file:
        - chmod +x xlsx_to_csv_yaml.command

    To start xlsx_to_csv_yaml, double click xlsx_to_csv_yaml.command file:


## First example

For Windows, double click xlsx_to_csv_yaml.bat file and type:

    input .xlsx file path> example.xlsx

You can drag and drop a file to enter the file without having to type it from the keyboard.

example.csv.yaml file is created in the folder containing the input file.
The content is in YAML format, with the key as the sheet name and the value as CSV.

    Sheet1: |
        CSV,1,2,3
        a,b,c,d
    Sheet2: |
        CSV,1,2,3
        a,b,c,d
