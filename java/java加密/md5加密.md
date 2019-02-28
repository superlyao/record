## MD5加密不可逆 加密过后不可解密

- jdk自带实现

`Hex`引入
```xml
        <dependency>
            <groupId>commons-codec</groupId>
            <artifactId>commons-codec</artifactId>
            <version>1.11</version>
        </dependency>
```

- jdk自带实现

```java
    public static void jdkMD5() {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] md5Byte = md5.digest(src.getBytes());
            System.out.println(Hex.encodeHexString(md5Byte));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
```

- apach commons codec 实现
```java
  public static void CCMD5() {
        System.out.println(DigestUtils.md2Hex(src.getBytes()));
    }
```