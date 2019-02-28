```java
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.SecureRandom;

/**
 * @Author: yliao
 * @Date: Created in 2018/7/28
 * AES较DES安全性较高
 */
public class AES {
    private static String src = "hello word";

    public static void main(String[] args) {
        jdkAES();
    }

    public static void jdkAES() {
        // 生成key
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
            // 生成默认默认长度
            keyGenerator.init(new SecureRandom());
            SecretKey secretKey = keyGenerator.generateKey();
            byte[] keyByte = secretKey.getEncoded();

            // key转换
            Key key = new SecretKeySpec(keyByte, "AES");

            // 加密
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("jdk aes加密:" + Hex.encodeHexString(result));

            // 解密
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] bytes = cipher.doFinal(result);
            System.out.println("jdk aes解密:" + new String(bytes));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```