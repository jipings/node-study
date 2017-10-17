// 使用umask方法修改进程的文件权限掩码

var oldmask, newmask = 0644;
oldmask = process.umask(newmask);

console.log(oldmask.toString(8),newmask.toString(8));