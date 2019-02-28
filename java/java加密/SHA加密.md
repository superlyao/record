jdk 自带实现
```java
   public static void jdkSHA1() {
        try {
            MessageDigest sha = MessageDigest.getInstance("SHA");
            sha.update(src.getBytes());
            System.out.println("jdkSHA1:"+Hex.encodeHexString(sha.digest()));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
```

apach commons codec 实现
```java
    public static void ccSHA1() {
        System.out.println("ccsha1:"+DigestUtils.sha1Hex(src.getBytes()));
    }
```