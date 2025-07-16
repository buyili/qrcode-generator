#!/bin/bash

# 目录复制脚本 - 将源目录的所有内容递归复制到目标目录
# 使用方法: copy_directory.sh 源目录 目标目录

# 检查参数数量
if [ "$#" -ne 2 ]; then
    echo "错误: 需要提供源目录和目标目录两个参数。" >&2
    echo "用法: $0 源目录 目标目录" >&2
    exit 1
fi

# 定义源目录和目标目录变量
SOURCE="$1"
DESTINATION="$2"

# 检查源目录是否存在
if [ ! -d "$SOURCE" ]; then
    echo "错误: 源目录 '$SOURCE' 不存在。" >&2
    exit 1
fi

# 确保目标目录存在
mkdir -p "$DESTINATION"
if [ $? -ne 0 ]; then
    echo "错误: 无法创建目标目录 '$DESTINATION'。" >&2
    exit 1
fi

# 复制文件和目录
echo "开始从 '$SOURCE' 复制到 '$DESTINATION'..."

# 使用rsync命令进行复制（如果可用）
if command -v rsync &> /dev/null; then
    rsync -avz --progress "$SOURCE/" "$DESTINATION/"
    if [ $? -ne 0 ]; then
        echo "错误: rsync复制过程中发生错误。" >&2
        exit 1
    fi
else
    # 备选方案：使用cp命令
    cp -r "$SOURCE/" "$DESTINATION/"
    if [ $? -ne 0 ]; then
        echo "错误: cp复制过程中发生错误。" >&2
        exit 1
    fi
fi

echo "复制完成！"    