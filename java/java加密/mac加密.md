```java
package md;

import org.apache.commons.codec.binary.Hex;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

/**
 * @Author: yliao
 * @Date: Created in 2018/7/24
 * 在md和sha上加入密钥
 */
public class MAC {
    private static String src = "hello word";

    public static void main(String[] args) {
        jdkHmacMd5();
    }
    
    public static void jdkHmacMd5 () {
        try {
            // 初始化keyGenerator
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacMD5");
            SecretKey secretKey = keyGenerator.generateKey();
            // 获得key
            byte[] key = secretKey.getEncoded();
            
            
            // 还原密钥
            SecretKey restoreSecretKey = new SecretKeySpec(key, "HmacMD5");

            Mac instance = Mac.getInstance(restoreSecretKey.getAlgorithm());
            // 初始化mac
            instance.init(restoreSecretKey);

            // 加密
            byte[] hmacMD5 = instance.doFinal(src.getBytes());
            System.out.println("jdkHmacMd5:" + Hex.encodeHexString(hmacMD5));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void ccHmacMd5() {
    }
}

```