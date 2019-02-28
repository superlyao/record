```java
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import java.security.Key;

/**
 * @Author: yliao
 * @Date: Created in 2018/7/28
 * 对称加密：加解密用的密钥都是一个
 */
public class DES {
    private static String src = "hello word";

    public static void main(String[] args) {
        jdkDES();
    }

    private static void jdkDES() {
        try {
            // 生存key
            KeyGenerator keyGenerator = KeyGenerator.getInstance("DES");
            SecretKey secretKey = keyGenerator.generateKey();
            // key的byte数组
            byte[] bytes = secretKey.getEncoded();

            // key 转换
            DESKeySpec desKeySpec = new DESKeySpec(bytes);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("DES");
            // 生成密钥
            Key key = factory.generateSecret(desKeySpec);

            // 加密
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] doFinal = cipher.doFinal(src.getBytes());
            System.out.println("jdk加密:" + Hex.encodeHexString(doFinal));

            // 解密
            cipher.init(Cipher.DECRYPT_MODE, key);
            doFinal = cipher.doFinal(doFinal);
            System.out.println("jdk解密:" + new String(doFinal));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```