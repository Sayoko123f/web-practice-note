# Windows batch
本篇程式碼，筆者在 Windows10 下環境執行。

## 輸出訊息
```
ECHO Hello World
```

### 換行
```
ECHO:
```

## 暫停
```
PAUSE
```

## 退出
```
EXIT /b
```

## for-loop
下方為循環(100次) 接收 user input，如果是 exit 就退出，否則將 input 作為 argv 傳遞給 Node.js 執行。

 
```batch
@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION

for /l %%x in (1, 1, 100) do (
ECHO Enter exit or e or q for exit.
set /p args="Enter args: "
if "!args!"=="exit" exit /b
if "!args!"=="e" exit /b
if "!args!"=="q" exit /b
node src/cli.js !args!
ECHO:
)
PAUSE
```