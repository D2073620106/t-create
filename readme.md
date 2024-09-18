# 命令行代码模板管理工具-dmc

## 1、项目介绍
dmc 是一个命令行工具，用于管理本地项目模板，可以快速基于模板项目创建项目，替换项目中指定的文本，减少重复性工作。
也可以用来管理单个的文件，如：代码文件等。

注意部分指令，执行后会直接覆盖原来的文件，执行前请思考是否需要覆盖

## 2、使用方法
1. 可以向本地仓库存入项目模板或文件
    ```bash
    # 保存文件夹(整个项目 | 某个文件夹)到本地 
    dmc save [path]
    # 保存文件到本地,并设置简介
    dmc save [path] -i [简介]
    # 保存远程地址到本地，名称name
    dmc save asas.git -n [name]
    # 保存远程仓库到本地，名称name，设置使用git账号，此指令未完善
    dmc save asas.git --name [name] --gitname [gitname] --gitpwd [gitpwd]
    # 创建vue分类，默认会存储到common分类，分类实际是一个文件夹
    dmc save -t [vue]  
    ```

2. 转存项目模板或文件到本地项目  

    ```bash
    # 下载指定文件或目录到运行指令的目录，都找不到的请款下创建文件夹并转入文件夹，如果有文件后缀，则创建文件，多个相同名称的文件则提供type选择
    dmc create [ 文件 | uuid]  
    # 替换文件中设置的的特定文字如dmc-name,dmc-author，哪些文本需要替换可以卸载在简介中，目前不支持一些特殊符号
    # 以下指令会在创建文件时将dmc-name替换为dmc-cli，dmc-author替换为dm
    dmc create [ 文件 | uuid] -r dmc-name=dmc-cli,dmc-author=dm
    ```

3. 基于本地项目文件创建新文件  

    ```bash
    # 基于本地项目文件或文件夹创建新文件或文件夹
    dmc copy [form] [to]  
    ```

4. 删除本地模板或远程链接  
    
    ```bash
    # 移除模板，有重名则展示列表，并提示
    dmc remove [uuid | name | type]
    # 移除vue分类和该分类下的所有模板
    dmc remove -a vue
    # 移除所有模板
    dmc remove -a
    ```

5. 本地模板查看 | 远端模板返回地址链接 

    ```bash
    # 列出本地已存储模板的绝对地址，表格形式  index | uuid | name | type | linkType  | createTime | desc
    dmc list
    # 查看单个文件,多个显示列表，选择后显示全部信息
    dmc list  [name | uuid]
    # 查看指定分类文件
    dmc list -t 
    ```

6. 配置信息更新指令 

    ```bash
    # 设置保存模板时需要忽略的目录或文件,逗号分割
    dmc config ignore node_modules,.git
    # 设置模板基础存储路径
    dmc config localTemplateSavePath ./  
    # 设置保存模板时的存储类型，localTemplateSavePath下的一个细分问价夹，在此工具中视作分类
    dmc config baseFolder common1  
    ```

7. 更新模板指令  

    ```bash
    dmc update <name | uuid> --name | --gitname | --gitemail | --branch | --desc
    ```

8. 帮助指令 

    ```bash
    dmc -h
    dmc save -h
    dmc list -h
    dmc update -h
    ...
    ```

