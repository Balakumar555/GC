using System.Reflection;

namespace GC.World.API.Helpers
{
    public class EntityUpdater
    {
        public static bool HasChanges<T>(T existingEntity, T incomingEnity, params string[] excludedProps)
        {
            var props= typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance).Where(p => !excludedProps.Contains(p.Name)).ToList();

            foreach (var prop in props)
            {
                var existingValue= prop.GetValue(existingEntity, null);
                var incomingValue = prop.GetValue(incomingEnity, null);
                if( !object.Equals(existingValue, incomingValue) )
                {
                    return true;
                }
            }
            return false;
        }
        public static void UpdateProperties<T>(T existingEntity, T incomingEntity, params string[] excludedProperties)
        {
            var properties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                                      .Where(p => !excludedProperties.Contains(p.Name))
                                      .ToList();

            foreach (var property in properties)
            {
                var incomingValue = property.GetValue(incomingEntity);
                property.SetValue(existingEntity, incomingValue);
            }
        }
    }
}
