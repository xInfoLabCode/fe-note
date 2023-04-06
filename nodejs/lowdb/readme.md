lowdb

### 说明
lowdb用于方便数据保存到本地，包括node端的本地文件，web端的各类storage

### 使用方法
1. 创建adapter，需指定数据保存介质（json文件｜localStorage｜sessionSto rage）
2. 使用Low创建db
3. 读取db中的数据到db.data，一个普通的js对象
4. 对js对象进行操作，操作完成后使用db.write()将js对象同步到介质
