```java
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;
import java.security.Key;
import java.security.SecureRandom;

/**
 * @Author: yliao
 * @Date: Created in 2018/7/28
 * 口令加密 加盐
 */
public class PBE {

    private static String src = "hello word";

    public static void main(String[] args) {
        jdkPBE();
    }

    public static void jdkPBE() {

        try {
            // 初始化盐
            SecureRandom random = new SecureRandom();
            byte[] salt = random.generateSeed(8);

            //口令转换密钥
            String password = "yliao";
            PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray());
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBEWITHMD5andDES");
            Key key = factory.generateSecret(pbeKeySpec);

            //加密 第一个参数是盐 第二个参数是迭代的次数
            PBEParameterSpec pbeParameterSpec = new PBEParameterSpec(salt, 100);
            Cipher cipher = Cipher.getInstance("PBEWITHMD5andDES");
            cipher.init(Cipher.ENCRYPT_MODE, key, pbeParameterSpec);
            byte[] result = cipher.doFinal(src.getBytes());
            System.out.println("jdk pbe加密:" + Hex.encodeHexString(result));


            // 解密
            cipher.init(Cipher.DECRYPT_MODE,key,pbeParameterSpec);
            result = cipher.doFinal(result);
            System.out.println("jdk pbe解密:" + new String(result));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```