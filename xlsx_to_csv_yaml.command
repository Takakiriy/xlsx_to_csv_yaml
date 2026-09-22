
# chmod +x xlsx_to_csv_yaml.command
export  script_file_path="$0"
export  parent_path="${script_file_path%/*}"
cd  "${parent_path}"
export  NODE_PATH=${PWD}/node_modules

node  build/src/xlsx_to_csv_yaml.js
